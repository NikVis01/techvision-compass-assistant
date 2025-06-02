
export interface ActionPoint {
  task: string;
  priority: string;
  due_date?: string;
  context?: string;
}

export interface ConsiderPoint {
  note: string;
  category?: string;
  related_to_action?: string;
}

export interface StructuredResponse {
  action_points?: ActionPoint[];
  consider_points?: ConsiderPoint[];
}

export interface ChatMessage {
  message: string;
  session_id?: string;
}

export interface StructuredChatMessage extends ChatMessage {
  use_structured_output?: boolean;
}

export interface ChatResponse {
  response: string;
  session_id: string;
}

export interface StructuredChatResponse {
  structured_data: StructuredResponse;
  session_id: string;
}
