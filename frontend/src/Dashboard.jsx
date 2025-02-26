import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <option>Semua Akun</option>
            <option>Chase Bank</option>
            <option>Bank of America</option>
          </select>
        </div>
      </div>

      {/* Row untuk cards */}
      <div className="row mb-4 justify-content-center">
        {/* Card for Rata-rata Transaksi Masuk */}
        <div className="col-md-2 mb-4 d-flex justify-content-start">
          <div className="card p-3">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fs-6">Rata-rata Transaksi Masuk</h5>
              <p className="card-text fs-6"><strong>Rp 1.702.685.333</strong></p>
            </div>
          </div>
        </div>

        {/* Card for Rata-rata Saldo */}
        <div className="col-md-2 mb-4 d-flex justify-content-start">
          <div className="card p-3">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fs-6">Rata-rata Transaksi Keluar</h5>
              <p className="card-text fs-6"><strong>Rp 414.475.167</strong></p>
            </div>
          </div>
        </div>

        {/* Card for Rata Saldo */}
        <div className="col-md-2 mb-4 d-flex justify-content-start">
          <div className="card p-3">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fs-6">Rata-rata Saldo</h5>
              <p className="card-text fs-6"><strong>Rp 12.425.443</strong></p>
            </div>
          </div>
        </div>

        {/* Card for Tolak Kliring */}
        <div className="col-md-2 mb-4 d-flex justify-content-start">
          <div className="card p-3">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fs-6">Tolak Kliring</h5>
              <p className="card-text fs-6"><strong>1</strong></p>
            </div>
          </div>
        </div>

        {/* Card for Total Pinjaman Masuk */}
        <div className="col-md-2 mb-4 d-flex justify-content-start">
          <div className="card p-3">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fs-6">Total Pinjaman Masuk</h5>
              <p className="card-text fs-6"><strong>Rp 12.425.442</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
