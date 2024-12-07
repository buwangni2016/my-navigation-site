// 从 Chrome 扩展存储中获取历史记录
function loadHistory() {
  if (chrome.storage) {
    chrome.storage.local.get(['history'], (result) => {
      if (result.history) {
        const history = result.history;

        // 根据访问次数排序
        const sortedHistory = history.sort((a, b) => b.visitCount - a.visitCount);

        // 动态生成链接
        const linkList = document.getElementById('link-list');
        linkList.innerHTML = ''; // 清空列表
        sortedHistory.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.url;
          a.textContent = `${item.title || item.url} (${item.visitCount})`;
          a.target = '_blank';
          li.appendChild(a);
          linkList.appendChild(li);
        });
      } else {
        console.log("扩展存储中没有历史记录数据");
      }
    });
  } else {
    console.error("您的浏览器不支持 Chrome 扩展 API");
  }
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', loadHistory);
