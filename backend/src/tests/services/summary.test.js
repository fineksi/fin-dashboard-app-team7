const test = require("ava");
const SummaryService = require("../../services/summary.js");

function createMockSummaryRepo() {
    const data = [
        { id: 1, totalSales: 100000 },
        { id: 2, totalPosts: 200000 }
    ];

    return {
        getSummaryById: async (id) => {
            return data.find(item => item.id === id) || null;
        }
    };
}

function setup() {
    const mockSummaryRepo = createMockSummaryRepo();
    const summaryService = SummaryService(mockSummaryRepo);
    return { summaryService };
}

test("should return summary data when user exists", async (t) => {
    const { summaryService } = setup();
    const result = await summaryService.getSummary(1);
    t.deepEqual(result, { id: 1, totalSales: 100000 });
});

test("should throw error when user does not exist", async (t) => {
    const { summaryService } = setup();
    const error = await t.throwsAsync(() => summaryService.getSummary(3));
    t.is(error.message, "Data summary tidak ditemukan.");
});

test("should throw error when user ID is not given", async (t) => {
    const { summaryService } = setup();
    const error = await t.throwsAsync(() => summaryService.getSummary(null));
    t.is(error.message, "User ID harus ada.");
});
