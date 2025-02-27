const SummaryService = (summaryRepository) => {
    return {
        getSummary: async (id) => {
            if (!id) {
                throw new Error("User ID harus ada.");
            }

            const summary = await summaryRepository.getSummaryById(id);
            if (!summary) {
                throw new Error("Data summary tidak ditemukan.");
            }

            return summary;
        }
    };
};

module.exports = SummaryService;
