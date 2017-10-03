# A. Kiến thức cơ bản về Elasticsearch

![Mô hình đơn giản](https://user-images.githubusercontent.com/31585927/31107757-e3aca344-a81e-11e7-85b8-bbb09e4acd36.png)

### 1.Node
* Server trong kiến trúc của elasticsearch
* Lưu trữ dữ liệu cho mục đích tìm kiếm

### 2.Cluster
* Tập hợp các nodes hoạt động cùng với nhau (các nodes sẽ có cùng thuộc tính **cluster.name** )
* Cluster có **một node chính, lựa chọn ngẫu nhiên**

### 3.Shard
* Mỗi node gồm nhiều shard (đơn vị hoạt động ở mức thấp nhất, lưu trữ dữ liệu)
* Có 2 loại Shard: **primary shard** và **replica shard**
* Primary Shard
    * Dữ liệu được lưu tại 1 primary shard, đánh index và chuyển đến replica shard
    * Một khi khởi tạo index sẽ **không thể thay đổi số lượng primary shard cho nó**
* Replica Shard
    * Đảm bảo toàn vẹn dữ liệu khi primary shard gặp sự cố
    * Mặc định 1 replica shard/ 1 primary shard
    * Một primary shard có thể có hoặc ko có replica shard
    * **Số lượng replica shard có thể thay đổi**
### 4. Lấy thông tin Cluster bằng lệnh
```rest
GET _cluster/health?pretty
```



**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**

