const SHOP_URL = 'https://tranthiquynhnhu0901-hue.github.io/shopthethao/';

const categories = [
  { key:'all', label:'Tất cả', desc:'Stories, guides và xu hướng thể thao từ SPORTHUB DAILY.' },
  { key:'chay-bo', label:'Chạy bộ', desc:'Running, marathon, kỹ thuật, giày và phụ kiện.' },
  { key:'gym-fitness', label:'Gym & Fitness', desc:'Training, workout, routine và lifestyle.' },
  { key:'bong-da', label:'Bóng đá', desc:'Boots, văn hóa sân cỏ và góc nhìn thể thao.' },
  { key:'sports-fashion', label:'Sports Fashion', desc:'Sportswear, sneaker, outfit và xu hướng.' },
  { key:'kien-thuc', label:'Kiến thức', desc:'Những khái niệm và nguyên tắc dễ hiểu để vận động tốt hơn.' }
];

const articles = [
  {
    slug:'chon-giay-chay-bo', category:'chay-bo', categoryLabel:'Chạy bộ', title:'Cách chọn giày chạy bộ phù hợp theo từng mục đích', excerpt:'Kiểu chạy, độ đệm, độ bám, size và cảm giác khi thử — những tiêu chí quan trọng để chọn đúng đôi giày cho bạn.', date:'30/09/2026', read:'7 phút', image:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=85', featured:true,
    body:[
      {h:'1. Bắt đầu từ mục đích chạy', p:'Trước khi nhìn vào thương hiệu hay thiết kế, hãy xác định bạn chạy để làm gì: đi bộ nhanh, chạy 3–5 km, chạy đường dài hay tập tốc độ. Mỗi nhu cầu sẽ ưu tiên cảm giác và cấu trúc đế khác nhau.'},
      {h:'2. Quan tâm đến độ đệm', p:'Độ đệm ảnh hưởng trực tiếp đến cảm giác dưới chân. Người mới thường thích cảm giác êm và ổn định; người chạy tốc độ có thể thích một đôi phản hồi nhanh hơn.'},
      {h:'3. Kiểm tra form và size', p:'Đừng chỉ dựa vào size quen thuộc. Hãy thử giày vào cuối ngày, mang đúng loại tất khi chạy và chừa khoảng trống hợp lý ở mũi chân.'},
      {h:'4. Độ bám và môi trường chạy', p:'Đường nhựa, sân tập trong nhà hay đường mòn có yêu cầu khác nhau về mặt đế. Một đôi dùng tốt trên máy chạy chưa chắc phù hợp với địa hình ẩm hoặc nhiều sỏi.'},
      {h:'5. Cuối cùng là cảm giác thật của bạn', p:'Hai đôi giày có thông số tương tự vẫn có thể cho cảm giác hoàn toàn khác. Sau cùng, đôi phù hợp là đôi khiến bạn thấy tự tin, ổn định và muốn mang nó lên đường.'}
    ]
  },
  {slug:'giay-running-vs-training', category:'chay-bo', categoryLabel:'Chạy bộ', title:'Giày running và training khác nhau thế nào?', excerpt:'Nhìn đúng vào chuyển động, độ ổn định và bề mặt tập để tránh mua nhầm giày.', date:'29/09/2026', read:'5 phút', image:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1100&q=85'},
  {slug:'zone-2-la-gi', category:'kien-thuc', categoryLabel:'Kiến thức', title:'Zone 2 là gì và vì sao người mới chạy nên quan tâm?', excerpt:'Một cách tiếp cận cường độ chạy dễ hiểu cho những ai muốn xây nền thể lực.', date:'28/09/2026', read:'6 phút', image:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1100&q=85'},
  {slug:'5-loi-nguoi-moi-chay-bo', category:'chay-bo', categoryLabel:'Chạy bộ', title:'5 lỗi người mới chạy bộ thường mắc phải', excerpt:'Tăng tốc quá sớm, bỏ qua khởi động và vài thói quen tưởng nhỏ nhưng ảnh hưởng lớn.', date:'27/09/2026', read:'4 phút', image:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1100&q=85'},
  {slug:'outfit-gym-cho-nguoi-moi', category:'gym-fitness', categoryLabel:'Gym & Fitness', title:'Người mới tập gym nên chọn outfit như thế nào?', excerpt:'Ưu tiên chất liệu, độ co giãn và form để tập thoải mái nhưng vẫn gọn gàng.', date:'26/09/2026', read:'5 phút', image:'https://images.unsplash.com/photo-1517838277536-f5f99be501a6?auto=format&fit=crop&w=1100&q=85'},
  {slug:'sportswear-daily', category:'sports-fashion', categoryLabel:'Sports Fashion', title:'Sportswear bước ra khỏi phòng tập như thế nào?', excerpt:'Từ đồ tập thành phong cách hằng ngày: cách phối tối giản mà vẫn có chất thể thao.', date:'25/09/2026', read:'6 phút', image:'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1100&q=85'},
  {slug:'giay-da-bong-5-a-side', category:'bong-da', categoryLabel:'Bóng đá', title:'Chọn giày đá bóng cho sân cỏ nhân tạo: bắt đầu từ đâu?', excerpt:'Bề mặt sân, độ bám và cảm giác bóng là ba điểm cần kiểm tra trước khi chọn.', date:'24/09/2026', read:'5 phút', image:'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1100&q=85'},
  {slug:'prepare-10k', category:'chay-bo', categoryLabel:'Chạy bộ', title:'Từ 0 đến 10K: một lộ trình đơn giản cho người mới', excerpt:'Cách chia buổi chạy và ngày nghỉ để tạo nền tảng mà không ép cơ thể quá mức.', date:'23/09/2026', read:'8 phút', image:'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1100&q=85'}
];

const popular = articles.slice(0,5);
