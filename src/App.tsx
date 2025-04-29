import { useState } from "react";
import {
  useGetCategoryQuery,
  useDelCategoryMutation,
  useAddCategoryMutation,
  useEditCategoryMutation,
} from "./api/category/category";

const App = () => {
  const { data, isLoading, isError } = useGetCategoryQuery();
  const [deleteCategory] = useDelCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const [name, setName] = useState("");
  const [editiId, setEditiId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);

  const handleAdd = async () => {
    if (name.trim()) {
      await addCategory({ name });
      setName("");
    }
  };

  const openModal = (id: number, currentName: string) => {
    setEditiId(id);
    setEditedName(currentName);
    setModalOpen(true);
  };

  const handleEdit = () => {
    if (editedName.trim()) {
      editCategory({ updatedData: { name: editedName, id: editiId } });
      setModalOpen(false);
      setEditiId(null);
      setEditedName("");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditiId(null);
    setEditedName("");
  };

  if (isLoading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (isError) return <p style={{ padding: "20px", color: "red" }}>Error</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Todo Category</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={name}
          placeholder="New Category"
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "10px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data?.data?.map((el: any) => (
          <div
            key={el.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span>{el.name}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => openModal(el.id, el.name)}
                style={{
                  backgroundColor: "#ffa500",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                ✏️
              </button>
              <button
                onClick={() => deleteCategory(el.id)}
                style={{
                  backgroundColor: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {ModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>Edit Category</h3>
            <p>ID Category: <span>{editiId}</span></p>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "15px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleEdit}
                style={{
                  padding: "8px 15px",
                  fontSize: "16px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 15px",
                  fontSize: "16px",
                  backgroundColor: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
