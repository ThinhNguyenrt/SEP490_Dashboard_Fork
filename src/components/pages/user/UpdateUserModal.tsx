import React, { useState, useEffect } from "react";
import { X, Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import { notify } from "@/lib/toast";
import { Employee } from "@/types/user";

interface UpdateUserModalProps {
  isOpen: boolean;
  userProfile: Employee;
  onClose: () => void;
  onSuccess?: () => void; // Callback để load lại data sau khi update
}

const UpdateUserModal = ({ isOpen, userProfile, onClose, onSuccess }: UpdateUserModalProps) => {
  // --- States cho Form ---
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  
  // --- Preview States (để hiển thị ảnh tạm thời trước khi upload) ---
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen && userProfile) {
      setName(userProfile.name || "");
      setPhone(userProfile.phone || "");
      setAvatarPreview(userProfile.avatar || "");
      setCoverPreview(userProfile.coverImage || "");
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  // --- Logic xử lý chọn ảnh ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setAvatar(file);
          setAvatarPreview(reader.result as string);
        } else {
          setCoverImage(file);
          setCoverPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Logic Gọi API ---
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Khớp chính xác với các Key trong ảnh Swagger của bạn
      formData.append("Name", name);
      formData.append("Phone", phone);
      
      if (avatar) {
        formData.append("Avatar", avatar);
      }
      if (coverImage) {
        formData.append("CoverImage", coverImage);
      }

      const response = await fetch(`https://userprofile-service.grayforest-11aba44e.southeastasia.azurecontainerapps.io/api/Employee/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Lưu ý: Không set 'Content-Type' khi gửi FormData, trình duyệt sẽ tự set kèm boundary
        },
        body: formData,
      });

      if (response.ok) {
        notify.success("Cập nhật thông tin thành công!");
        onSuccess?.();
        onClose();
      } else {
        const errorData = await response.json();
        notify.error(errorData.message || "Cập nhật thất bại");
      }
    } catch (err) {
      notify.error("Lỗi kết nối máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Chỉnh sửa thông tin</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Cover Image Section */}
          <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden group">
            {coverPreview && <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />}
            <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <div className="bg-white/80 p-2 rounded-full shadow">
                <ImageIcon className="w-5 h-5 text-gray-700" />
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
            </label>
            <span className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">Ảnh bìa</span>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center -mt-12 relative z-10">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">User</div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 shadow-lg border-2 border-white">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập tên của bạn..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập số điện thoại..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;