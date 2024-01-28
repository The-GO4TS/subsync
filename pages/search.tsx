import React, { useState } from 'react';
import { Input, SelectPicker, Button, Panel, List } from 'rsuite';

// Sample product data
interface Product {
    id: number;
    name: string;
    category: string;
}

const products: Product[] = [
    { id: 1, name: 'Product A', category: 'Electronics' },
    { id: 2, name: 'Product B', category: 'Clothing' },
    { id: 3, name: 'Product C', category: 'Electronics' },
    // Add more products as needed
];

const SearchBar: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const handleSearch = () => {
        // Filter products based on keyword and category
        const results = products.filter(
            (product) =>
                product.name.toLowerCase().includes(keyword.toLowerCase()) &&
                (category === '' || product.category === category)
        );
        setSearchResults(results);
    };

    return (
        <Panel header={<h3 className="searchBar">Filter</h3>} bordered collapsible shaded>
            <div style={{ marginBottom: 16}}>
                <Input
                    style={{ marginBottom: 5}}
                    placeholder="Enter Zip Code"
                    value={keyword}
                    onChange={(value) => setKeyword(value)}
                />
                <SelectPicker
                    style={{ marginBottom: 5}}
                    data={[
                        { value: '', label: 'All Terms' },
                        { value: 'Fall', label: 'Fall' },
                        { value: 'Spring', label: 'Spring' },
                        { value: 'Summer', label: 'Summer' },
                    ]}
                    placeholder="Select Term"
                    value={category}
                    onChange={(value) => setCategory(value)}
                />
                <Input
                    style={{ marginBottom: 5}}
                    placeholder="Enter Year"
                    value={keyword}
                    onChange={(value) => setKeyword(value)}
                />
                <Input
                    style={{ marginBottom: 5}}
                    placeholder="Enter Number of Roommates"
                    value={keyword}
                    onChange={(value) => setKeyword(value)}
                />
                <Input
                    style={{ marginBottom: 5}}
                    placeholder="Enter Budget $"
                    value={keyword}
                    onChange={(value) => setKeyword(value)}
                />
                <Button appearance="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>

            {searchResults.length > 0 ? (
                <List hover>
                    {searchResults.map((product) => (
                        <List.Item key={product.id}>
                            <b>{product.name}</b> - {product.category}
                        </List.Item>
                    ))}
                </List>
            ) : (
                <p>No results found.</p>
            )}
        </Panel>
    );
};

export default SearchBar;
