const { useState, useEffect } = React;

function App() {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ id: null, name: '', price: '' });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const addItem = async (e) => {
        e.preventDefault();
        if (!currentItem.name || !currentItem.price) return;

        try {
            const response = await fetch('/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: currentItem.name,
                    price: parseFloat(currentItem.price)
                })
            });
            const data = await response.json();
            setItems([...items, data]);
            setCurrentItem({ id: null, name: '', price: '' });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await fetch(`/items/${id}`, { method: 'DELETE' });
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const updateItem = async (e) => {
        e.preventDefault();
        if (!currentItem.name || !currentItem.price) return;

        try {
            const response = await fetch(`/items/${currentItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: currentItem.name,
                    price: parseFloat(currentItem.price)
                })
            });
            const data = await response.json();
            setItems(items.map(item => (item.id === currentItem.id ? data : item)));
            setEditing(false);
            setCurrentItem({ id: null, name: '', price: '' });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const editItem = (item) => {
        setEditing(true);
        setCurrentItem({ id: item.id, name: item.name, price: item.price });
    };

    return (
        <div className="container">
            <h1>Item Management System</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <div>
                            <h2>Edit Item</h2>
                            <form onSubmit={updateItem}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={currentItem.name}
                                    onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    value={currentItem.price}
                                    onChange={e => setCurrentItem({ ...currentItem, price: e.target.value })}
                                />
                                <button>Update Item</button>
                                <button onClick={() => { setEditing(false); setCurrentItem({ id: null, name: '', price: '' }) }} className="button-secondary">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2>Add Item</h2>
                            <form onSubmit={addItem}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={currentItem.name}
                                    onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    value={currentItem.price}
                                    onChange={e => setCurrentItem({ ...currentItem, price: e.target.value })}
                                />
                                <button>Add Item</button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="flex-large">
                    <h2>View Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => editItem(item)} className="button-edit">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteItem(item.id)} className="button-delete">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No items</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Only render the React component if the element with ID 'root' exists
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.render(<App />, rootElement);
}
