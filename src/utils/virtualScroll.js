/**
 * 
 * 
 */


;(function(window) {

  "use strict"
  
// 聚簇數據
var clusterData = [
  { id: 1, text: '聚簇1' },
  { id: 2, text: '聚簇2' },
  { id: 3, text: '聚簇3' },
  // ...
];

// 聚簇容器元素
var clusterContainer = document.getElementById('cluster-container');

// 更新 DOM 函數
function updateDOM() {
  // 清空容器元素
  clusterContainer.innerHTML = '';

  // 生成 HTML 代碼並插入到容器元素
  for (var i = 0; i < clusterData.length; i++) {
    var clusterItem = clusterData[i];
    var clusterHTML = '<div class="cluster">' + clusterItem.text + '</div>';
    clusterContainer.appendChild(clusterHTML);
  }
}

// 初始化
updateDOM();

// 添加新的聚簇
function addCluster(newCluster) {
  clusterData.push(newCluster);
  updateDOM();
}

// 刪除聚簇
function deleteCluster(clusterId) {
  clusterData = clusterData.filter(function(item) {
    return item.id !== clusterId;
  });
  updateDOM();
}


})(window);
