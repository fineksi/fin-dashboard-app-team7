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

test("should return summary data when user exists", async (t) => {
    const mockSummaryRepo = createMockSummaryRepo();
    const summaryService = SummaryService(mockSummaryRepo);

    const result = await summaryService.getSummary(1);

    t.deepEqual(result, { id: 1, totalSales: 100000 });
});
