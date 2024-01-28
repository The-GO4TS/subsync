import React, { useState } from 'react';
import { Input, SelectPicker, Button, Panel, List, Row, Col } from 'rsuite';

// Sample product data
interface Listing {
    id: number;
    zipcode: string;
    term: string;
    year: string;
    roommateCount: string;
    budget: string;
}

const products: Listing[] = [
    // { id: 1, name: 'Product A', category: 'Electronics' },
    // { id: 2, name: 'Product B', category: 'Clothing' },
    // { id: 3, name: 'Product C', category: 'Electronics' },
    // Add more products as needed
];

const SearchBar: React.FC = () => {
    const [zip, setZip] = useState<string>('');
    const [term, setTerm] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [roommatesCount, setRoommatesCount] = useState<string>('');
    const [budget, setBudget] = useState<string>('');


    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const handleSearch = () => {
        // Filter products based on keyword and category
        const results = products.filter(
            (product) =>
                product.name.toLowerCase().includes(zip.toLowerCase()) &&
                (term === '' || product.category === term)
        );
        setSearchResults(results);
    };

    return (
        <Panel header={<h3 className="searchBar">Filter</h3>} bordered collapsible shaded>
            <Row style={{ marginBottom: 16}}>
                <Col>
                    <Input
                        style={{ marginBottom: 5, width: 200}}
                        placeholder="Enter Zip Code"
                        value={zip}
                        onChange={(value) => setZip(value)}
                    />
                </Col>
                <Col>
                    <SelectPicker
                        style={{ marginBottom: 5}}
                        data={[
                            { value: '', label: 'All Terms' },
                            { value: 'Fall', label: 'Fall' },
                            { value: 'Spring', label: 'Spring' },
                            { value: 'Summer', label: 'Summer' },
                        ]}
                        placeholder="Select Term"
                        value={term}
                        onChange={(value) => setTerm(value)}
                    />
                </Col>
                <Col>
                    <Input
                        style={{ marginBottom: 5}}
                        placeholder="Enter Year"
                        value={year}
                        onChange={(value) => setYear(value)}
                    />
                </Col>
                <Col>
                    <Input
                        style={{ marginBottom: 5}}
                        placeholder="Enter # of Roommates"
                        value={roommatesCount}
                        onChange={(value) => setRoommatesCount(value)}
                    />
                </Col>
                <Col>
                    <Input
                        style={{ marginBottom: 5}}
                        placeholder="Enter Budget $"
                        value={budget !== '' ? '$' + budget : undefined}
                        onChange={(value) => setBudget(value.replace('$', ''))}
                    />
                </Col>
                <Col>
                    <Button appearance="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Col>
            </Row>

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
