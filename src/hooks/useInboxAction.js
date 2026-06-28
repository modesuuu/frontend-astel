import { useState } from "react";
import applicationService from "@/services/application.service";

export default function useInboxAction(removeInbox) {
  const [loading, setLoading] = useState(false);

  const accept = async (applicationId) => {
    try {
      setLoading(true);

      await applicationService.acceptApplication(applicationId);

      // refresh inbox setelah accept
      removeInbox(applicationId);
    } finally {
      setLoading(false);
    }
  };

  const reject = async (applicationId) => {
    try {
      setLoading(true);

      await applicationService.rejectApplication(applicationId);

      // refresh inbox setelah reject
      removeInbox(applicationId);
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
