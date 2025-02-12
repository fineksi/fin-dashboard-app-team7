const lang = {
    SUCCESS: (name = 'Permintaan') => `${name} telah berhasil diproses`,

    ERROR_INTERNAL_SERVER: 'Internal Server Error',
    ERROR_NOT_FOUND: (name = 'Data', code = '') => `${name} tidak ditemukan${code ? ` (${code})` : ''}`,
    ERROR_VALIDATION: (name = 'Data') => `${name} tidak sesuai dengan kriteria`,
    ERROR_RESOURCE_DESTROYED_ALREADY: 'Resource has been destroyed',
    ERROR_REDIS: 'Application Server Error (RE1001)',

    FAILED_AUTH_REQUIRED: (code = '') => `Tidak Ada Otorisasi${code ? ` (${code})` : ''}`,
    FAILED_SIGNATURE: (code = '') => `Signature failed${code ? ` (${code})` : ''}`,
    FAILED_AUTHORIZATION: (code = '') => `Otorisasi Tidak Berhasil${code ? ` (${code})` : ''}`,
    SUCCESS_DELETE: (name = 'Data') => `${name} berhasil dihapus`,

    FAILED_UPLOAD: () => 'Dokumen Gagal Diunggah',
    VERIFICATION_PROCESS_FAILED: (name, errorCode = '') => `Proses Verifikasi ${name} belum berhasil. Silahkan Coba Kembali (${errorCode})`,
};
module.exports = lang;
