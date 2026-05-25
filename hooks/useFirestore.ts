// hooks/useFirestore.ts
import { useState, useCallback, useEffect } from "react";
import {
  getDocument,
  setDocument,
  updateDocument,
  getCollection,
  addDocument,
  deleteDocument,
} from "@/lib/firebase/firestore";

export function useFirestoreDocument<T>(collectionName: string, docId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getDocument<T>(collectionName, docId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  const updateData = useCallback(async (newData: Partial<T>) => {
    try {
      setLoading(true);
      await updateDocument(collectionName, docId, newData);
      setData(prev => prev ? { ...prev, ...newData } : null);
      setError(null);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  const saveData = useCallback(async (newData: T) => {
    try {
      setLoading(true);
      await setDocument(collectionName, docId, newData);
      setData(newData);
      setError(null);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const result = await getDocument<T>(collectionName, docId);
        if (!active) {
          return;
        }

        setData(result);
        setError(null);
      } catch (err) {
        if (active) {
          setError(err as Error);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      active = false;
    };
  }, [collectionName, docId]);

  return { data, loading, error, fetchData, updateData, saveData };
}

type OrderedRecord = { order?: number };

export function useFirestoreCollection<T extends OrderedRecord>(collectionName: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getCollection<T>(collectionName);
      // Sort by order if exists
      const sorted = [...result].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setItems(sorted);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const addItem = useCallback(async (data: Omit<T, 'id'>, customId?: string) => {
    try {
      setLoading(true);
      const id = await addDocument(collectionName, data, customId);
      await fetchItems();
      setError(null);
      return id;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName, fetchItems]);

  const updateItem = useCallback(async (id: string, data: Partial<T>) => {
    try {
      setLoading(true);
      await updateDocument(collectionName, id, data);
      await fetchItems();
      setError(null);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [collectionName, fetchItems]);

  const deleteItem = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteDocument(collectionName, id);
      await fetchItems();
      setError(null);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [collectionName, fetchItems]);

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      try {
        setLoading(true);
        const result = await getCollection<T>(collectionName);
        if (!active) {
          return;
        }

        const sorted = [...result].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setItems(sorted);
        setError(null);
      } catch (err) {
        if (active) {
          setError(err as Error);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadItems();

    return () => {
      active = false;
    };
  }, [collectionName]);

  return { items, loading, error, fetchItems, addItem, updateItem, deleteItem };
}