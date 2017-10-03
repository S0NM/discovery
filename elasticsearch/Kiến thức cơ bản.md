# A. Kiến thức cơ bản về Elasticsearch
Created by **SonM** 
Created Date: 02/10/2017

![Mô hình đơn giản](https://user-images.githubusercontent.com/31585927/31107757-e3aca344-a81e-11e7-85b8-bbb09e4acd36.png)

### 1.Node
* Server trữ dữ liệu trong kiến trúc của elasticsearch

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
Kết quả trả về
```rest
{
  "cluster_name": "elasticsearch",
  "status": "yellow",
  "timed_out": false,
  "number_of_nodes": 1,
  "number_of_data_nodes": 1,
  "active_primary_shards": 15,
  "active_shards": 15,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 15,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 50
}
```
Trong đó giá trị của trường **status** cho biết:
* Red: vẫn còn primary shard chưa hoạt động
* Yellow: tất cả primary shard đã hoạt động nhưng replica shard chưa hoạt động
* Green: tât cả primary shard và replica shard đều hoạt động

**Chú ý: Khi chạy elastic trên 1 máy thì status = Yellow, lí do vì replica shard cần được cài đặt khác máy với primary shard**

# B.Phương thức lưu giữ phân tán
Một vài khái niệm
* **Mapping:** Định nghĩa cách thức một document, bao gồm các fields ủa nó được lưu trữ và đánh index
* **Mapping Type:** Một index có 1 hoặc nhiều mapping type được sử dụng để chia documents thành các logical group

Khi một bản ghi mới được thêm vào elasticsearch, chúng sẽ được lựa chọn để lưu trữ trên primary shard và replica shard. Công thức sử dụng trong trường hợp này
```rest
shard = hash(routing) % number_of_primary_shards
```
* hash: là một hàm tính toán cố định
* routing là 1 đoạn text theo document (thường là _id của document đó)
### 1.Quá trình lưu dữ liệu
![](https://user-images.githubusercontent.com/31585927/31113421-6d8d8b54-a843-11e7-85bb-4a9bc82bf88c.png)
1. Giả sử dữ liệu được gửi đến Node 1
2. Thông qua công thức ở trên, dữ liệu mới được tính toán để lưu trên primary shard 0
3. Node 3 thực hiện lưu trữ dữ liệu, sau khi thành công sẽ tiếp tục được gửi đến replica shard 0 ở Node 1 và Node 2

### 2.Quá trình lấy dữ liệu
![image](https://user-images.githubusercontent.com/31585927/31113587-30f0d420-a844-11e7-95d3-f341b9501c35.png)
1. Request được gửi đến Node 1 (Master)
2. Master tính toán dữ liệu lưu tại shard 0 và chọn ra 1 node và lấy dữ liệu
3. Replica shard 0 ở Node 2 trả về kết quả cho master node

# C.Phương thức tìm kiếm phân tán



**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**

