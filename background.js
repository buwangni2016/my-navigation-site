chrome.runtime.onInstalled.addListener(() => {
  console.log("导航历史记录助手扩展已安装");
});

chrome.action.onClicked.addListener(() => {
  chrome.history.search({ text: '', maxResults: 50 }, (results) => {
    // 获取最近访问的 50 个网站
    const historyData = results.map(item => ({
      url: item.url,
      title: item.title,
      visitCount: item.visitCount || 1
    }));

    // 将数据保存到 Chrome 扩展的存储中
    chrome.storage.local.set({ history: historyData }, () => {
      console.log("历史记录已保存到扩展存储中");
    });
  });
});
