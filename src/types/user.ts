export interface Employee {
  id: number;
  userId: number;
  name: string;
  phone: string;
  // email: string;
  // status: "Hoạt động" | "Bị khóa";
  // createAt: string;
  coverImage: string;
  avatar: string;
}
export interface Recruiter {
    id: string;
    userId: string;
    companyName: string;
    activityField: string;
    coverImage: string;
    avatar: string;
    taxIdentification: string;
    address: string;
    description: string;
      // email: string;
  // status: "Hoạt động" | "Bị khóa";
  // createAt: string;
}
