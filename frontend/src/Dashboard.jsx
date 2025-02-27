import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const accounts = [
  { id: 'all', name: 'Semua Akun' },
  { id: 'chase', name: 'Chase Bank' },
  { id: 'boa', name: 'Bank of America' }
];
const statistics = [
  { id: 'inflow', title: 'Rata-rata Transaksi Masuk', value: 'Rp 1.702.685.333' },
  { id: 'outflow', title: 'Rata-rata Transaksi Keluar', value: 'Rp 414.475.167' },
  { id: 'balance', title: 'Rata-rata Saldo', value: 'Rp 12.425.443' },
  { id: 'clearing', title: 'Tolak Kliring', value: '1' },
  { id: 'loan', title: 'Total Pinjaman Masuk', value: 'Rp 12.425.442' },
];

const Card = ({ title, value }) => (
  <div className="col-md-2 mb-4 d-flex justify-content-start">
    <div className="card p-3">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title fs-6">{title}</h5>
        <p className="card-text fs-6"><strong>{value}</strong></p>
      </div>
    </div>
  </div>
);

// ✅ Fix: Add prop validation for Card component
Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="mb-4 text-center">Multi-Account Bank Statement Analysis</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="small">Periode Analisis: 6 Bulan</h5>
        </div>
        <div className="col-md-6 text-end">
          <select className="form-select w-auto">
            {accounts.map((account) => (
              <option key={account.id}>{account.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-4 justify-content-center">
        {statistics.map((stat) => (
          <Card key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
