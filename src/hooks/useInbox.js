import { useCallback, useEffect, useState } from "react";
import applicationService from "@/services/application.service";

export default function useInbox() {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeInbox = (id) => {
    setInbox((prev) => prev.filter((item) => item._id !== id));
  };
  const updateInboxStatus = (id, status) => {
    setInbox((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  };

  const getInbox = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await applicationService.getInbox();

      setInbox(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch inbox");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInbox();
  }, [getInbox]);

  return {
    inbox,
    loading,
    error,
    refreshInbox: getInbox,
    removeInbox,
    updateInboxStatus,  
  };
}
