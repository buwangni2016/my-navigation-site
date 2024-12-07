document.getElementById('upload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const rows = content.split('\n').slice(1); // 跳过CSV表头
      const data = rows.map(row => {
        const cols = row.split(',');
        return { url: cols[0], count: parseInt(cols[1], 10) || 0 }; // 假设CSV是 [url, count] 格式
      });

      // 根据访问频率排序
      const sortedData = data.sort((a, b) => b.count - a.count);

      // 动态生成链接
      const linkList = document.getElementById('link-list');
      linkList.innerHTML = ''; // 清空之前的内容
      sortedData.forEach(item => {
        if (item.url) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.url;
          a.textContent = `${item.url} (${item.count})`;
          a.target = '_blank';
          li.appendChild(a);
          linkList.appendChild(li);
        }
      });
    };
    reader.readAsText(file);
  }
});
