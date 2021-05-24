# mini-STM


Cách chơi:
* Bản đồ sẽ được generate ngẫu nhiên ở đầu game, có từ 5-7 vật cản
* Quái sẽ xuất hiện ngẫu nhiên sau mỗi 2 giây, gồm 4 loại:
  * Quái bay: quái bay nhanh đến đích theo đường chéo, không bị cản, tuy nhiên máu rất yếu
  * Quái sát thủ: quái đi bộ, nhanh nhẹn nhưng máu hơi yếu
  * Quái băng: quái đi bộ, tốc độ và máu ở mức trung bình
  * Quái đá: quái đi bộ, tốc độ chậm nhưng rất trâu bò
* Quái sẽ tìm đường đi đến và tấn công nhà chính. Tuy nhiên, thuật toán tìm đường của quái không đủ thông minh nên đôi khi quái sẽ có thêm khả năng nhảy qua vật cản

* Người chơi có thể đặt trụ bắn bên trên một vật cản bằng cách click vào vật cản đó, thời gian cool down là 20s
** Có thể xảy ra trường hợp người chơi đặt 2 trụ chồng lên nhau => trường hợp này có thể xem như... trụ đã được cường hóa và nhân đôi sát thương
* Trụ bắn sau khi được xây lên sẽ tấn công tất cả quái đi vào tầm bắn, mỗi 0.5s một lần
* Mỗi lần quái bị trúng đạn sẽ teo nhỏ lại một chút
* Mỗi lần trụ tiêu diệt được quái, người chơi sẽ được cộng điểm. Tiêu diệt quái càng lớn thì càng nhận nhiều điểm
* Nhà chính có 10 máu. Mỗi quái đi đến tấn công nhà chính sẽ mất 1 máu. Trò chơi kết thúc khi nhà chính còn 0 máu

* Level sẽ tăng dần sau mỗi 30s, level càng cao thì máu của quái càng nhiều và kích thước quái càng lớn
