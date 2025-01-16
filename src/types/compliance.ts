// // import { LucideIcon } from 'lucide-react';

// // export interface ComplianceItem {
// //   id: string;
// //   title: string;
// //   description: string;
// //   status: boolean;
// //   severity: 'high' | 'medium' | 'low';
// //   recommendation?: string;
// // }

// // export interface ComplianceCategoryData {
// //   title: string;
// //   icon: LucideIcon;
// //   colorClass: string;
// //   items: ComplianceItem[];
// // }

// // export interface ComplianceData {
// //   [key: string]: ComplianceCategoryData;
// // }

// export interface ComplianceStats {
//   totalItems: number;
//   completedItems: number;
//   criticalItems: number;
//   progress: number;
// }
import { LucideIcon } from 'lucide-react';

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: boolean;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface ComplianceCategory {
  title: string;
  icon: LucideIcon;
  colorClass: string;
  items: ComplianceItem[];
}

export interface ComplianceData {
  [key: string]: ComplianceCategory;
}

export interface ComplianceStats {
  totalItems: number;
  completedItems: number;
  criticalItems: number;
  progress: number;
}