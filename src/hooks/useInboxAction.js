import { useState } from "react";
import applicationService from "@/services/application.service";

export default function useInboxAction(updateInboxStatus) {
  const [loading, setLoading] = useState(false);

  const accept = async (applicationId) => {
    try {
      setLoading(true);

      await applicationService.acceptApplication(applicationId);

      updateInboxStatus(applicationId, "accepted");
    } finally {
      setLoading(false);
    }
  };

  const reject = async (applicationId) => {
    try {
      setLoading(true);

      await applicationService.rejectApplication(applicationId);

      updateInboxStatus(applicationId, "rejected");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    accept,
    reject,
  };
}
