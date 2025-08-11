import React from "react";
import { AlertTriangle } from "lucide-react";

interface IWarningComponentProps {
  triggerWarningMessage: string;
  istriggerwarning: boolean;
}

export function WarningComponent(props: IWarningComponentProps) {
  const { triggerWarningMessage, istriggerwarning } = props;

  return (
    <div>
      {istriggerwarning && (
        <div className="mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-10"></div>
          <div className="relative p-5 bg-red-50 border-2 border-red-300 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-full shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-red-900 font-bold text-lg mb-1">คำเตือน</h4>
                <p className="text-red-800 font-medium">
                  {triggerWarningMessage || "เนื้อหานี้อาจมีความละเอียดอ่อนหรือไม่เหมาะสม"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WarningComponent;
