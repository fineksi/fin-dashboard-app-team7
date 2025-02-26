const test = require("ava");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

const DbStub = {
  query: sinon.stub(),
};

const AuthRepository = proxyquire("../../repositories/partner", {
  "./db": DbStub,
});

test.beforeEach(() => {
  DbStub.query.reset();
});

test("findById should return a user if found", async (t) => {
  const mockUser = {
    uuid: "5b1ec29e-9c11-416a-b396-a527732f8718",
    id: 1,
    email: "sigma@example.com",
    password: "exampleHashed",
  };

  DbStub.query.resolves([[mockUser], []]);

  const user = await AuthRepository.findById(1);

  t.deepEqual(user, mockUser);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where id = ? and deleted_at is null limit 1",
      [1]
    )
  );
});

test("findById should return undefined if user doesn't exist", async (t) => {
  DbStub.query.resolves([[]]);

  const user = await AuthRepository.findById(2);

  t.deepEqual(user, undefined);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where id = ? and deleted_at is null limit 1",
      [2]
    )
  );
});

test("findByUuid should return a user if found", async (t) => {
  const mockUser = {
    uuid: "5b1ec29e-9c11-416a-b396-a527732f8718",
    id: 1,
    email: "sigma@example.com",
    password: "exampleHashed",
  };

  DbStub.query.resolves([[mockUser], []]);

  const user = await AuthRepository.findByUuid(
    "5b1ec29e-9c11-416a-b396-a527732f8718"
  );

  t.deepEqual(user, mockUser);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where uuid = ? and deleted_at is null limit 1",
      ["5b1ec29e-9c11-416a-b396-a527732f8718"]
    )
  );
});

test("findByUUID should return undefined if user doesn't exist", async (t) => {
  DbStub.query.resolves([[]]);

  const user = await AuthRepository.findByUuid(
    "55555555-ffff-cccc-6666-aaaaaaaaaaaaaa"
  );

  t.deepEqual(user, undefined);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where uuid = ? and deleted_at is null limit 1",
      ["55555555-ffff-cccc-6666-aaaaaaaaaaaaaa"]
    )
  );
});

test("findByEmail should return a user if found", async (t) => {
  const mockUser = {
    uuid: "5b1ec29e-9c11-416a-b396-a527732f8718",
    id: 1,
    email: "sigma@example.com",
    password: "exampleHashed",
  };

  DbStub.query.resolves([[mockUser], []]);

  const user = await AuthRepository.findByEmail("sigma@example.com");

  t.deepEqual(user, mockUser);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where email = ? and deleted_at is null limit 1",
      ["sigma@example.com"]
    )
  );
});

test("findByEmail should return undefined if user doesn't exist", async (t) => {
  DbStub.query.resolves([[]]);

  const user = await AuthRepository.findByEmail("admin@fineksi.com");

  t.deepEqual(user, undefined);
  t.true(
    DbStub.query.calledWith(
      "select * from partner where email = ? and deleted_at is null limit 1",
      ["admin@fineksi.com"]
    )
  );
});

test("findById should return undefined if id provided is null", async (t) => {
  DbStub.query.resolves([[]]);
  const user = await AuthRepository.findById(null);

  t.is(user, undefined);
});

test("findByUuid should return undefined if uuid provided is null", async (t) => {
  DbStub.query.resolves([[]]);
  const user = await AuthRepository.findByUuid(null);

  t.is(user, undefined);
});

test("findByEmail should return undefined if email provided is null", async (t) => {
  DbStub.query.resolves([[]]);
  const user = await AuthRepository.findByEmail(null);

  t.is(user, undefined);
});

test("findById should return undefined if id provided is non-numeric", async (t) => {
  DbStub.query.resolves([[]]);
  const user = await AuthRepository.findById("Email");

  t.is(user, undefined);
});

test("findByEmail should return undefined if email provided is empty string", async (t) => {
  DbStub.query.resolves([[]]);
  const user = await AuthRepository.findByEmail("");

  t.is(user, undefined);
});

test("updateLastLogin should update last_login_at for the logged in user", async (t) => {
  DbStub.query.resolves([{ affectedRows: 1 }]);

  await AuthRepository.updateLastLogin("partner@mail.com");

  t.true(
    DbStub.query.calledWith(
      "UPDATE partner SET last_login_at = NOW() WHERE email = ?",
      ["partner@mail.com"]
    )
  );
});
