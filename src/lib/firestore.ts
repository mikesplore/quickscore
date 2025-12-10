import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  DocumentData,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string;
  role: "individual" | "business" | "lender";
  phone?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface BorrowerData {
  uid: string;
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    idNumber?: string;
  };
  eligibilityScore?: number;
  riskRating?: {
    level: string;
    defaultProbability: number;
  };
  verification?: {
    identityVerified: boolean;
    incomeVerified: boolean;
    creditScoreVerified: boolean;
    employmentVerified: boolean;
  };
  assessment?: {
    creditScore: number;
    incomeStability: number;
    debtToIncome: number;
    employmentHistory: number;
    savingsRatio: number;
  };
  loanDetails?: {
    recommendedAmount: number;
    interestRate: number;
    debtToIncomeRatio: number;
  };
  financialSummary?: {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlySavings: number;
    savingsRate: number;
  };
  incomeData?: Array<{ month: string; income: number }>;
}

export interface LenderData {
  uid: string;
  institutionInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    registrationNumber?: string;
  };
  metrics?: {
    totalApplications: number;
    autoApproved: number;
    flagged: number;
    rejected: number;
  };
}

// Create or update user profile
export const createUserProfile = async (
  uid: string, 
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      ...data,
      uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user profile");
  }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get user profile");
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string, 
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user profile");
  }
};

// Create or update borrower data
export const createBorrowerData = async (
  uid: string, 
  data: Partial<BorrowerData>
): Promise<void> => {
  try {
    const borrowerRef = doc(db, "borrowers", uid);
    await setDoc(borrowerRef, {
      ...data,
      uid,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message || "Failed to create borrower data");
  }
};

// Get borrower data
export const getBorrowerData = async (uid: string): Promise<BorrowerData | null> => {
  try {
    const borrowerRef = doc(db, "borrowers", uid);
    const borrowerSnap = await getDoc(borrowerRef);
    
    if (borrowerSnap.exists()) {
      return borrowerSnap.data() as BorrowerData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get borrower data");
  }
};

// Create or update lender data
export const createLenderData = async (
  uid: string, 
  data: Partial<LenderData>
): Promise<void> => {
  try {
    const lenderRef = doc(db, "lenders", uid);
    await setDoc(lenderRef, {
      ...data,
      uid,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message || "Failed to create lender data");
  }
};

// Get lender data
export const getLenderData = async (uid: string): Promise<LenderData | null> => {
  try {
    const lenderRef = doc(db, "lenders", uid);
    const lenderSnap = await getDoc(lenderRef);
    
    if (lenderSnap.exists()) {
      return lenderSnap.data() as LenderData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get lender data");
  }
};
