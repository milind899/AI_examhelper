export interface Topic {
  id: string;
  name: string;
}

export interface Unit {
  id: number;
  title: string;
  topics: Topic[];
  pyqs: string[];
}

export interface CourseData {
  courseName: string;
  courseCode: string;
  units: Unit[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}