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

const listings: Listing[] = [
    {id: 1, zipcode: '77433', term: 'Fall', year: '2024', roommateCount: '0', budget: '$800'},
    {id: 2, zipcode: '77479', term: 'Spring', year: '2024', roommateCount: '1', budget: '$600'},
    {id: 3, zipcode: '77840', term: 'Summer', year: '2024', roommateCount: '2', budget: '$1000'},
    {id: 4, zipcode: '77079', term: '', year: '2024', roommateCount: '', budget: '$400'},
];

const SearchBar: React.FC = () => {
    const [zip, setZip] = useState<string>('');
    const [term, setTerm] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [roommatesCount, setRoommatesCount] = useState<string>('');
    const [budget, setBudget] = useState<string>('');


    const [searchResults, setSearchResults] = useState<Listing[]>([]);

    const handleSearch = () => {
        // Filter products based on keyword and category
        const results = listings.filter(
            (listing) =>
                listing.term.toLowerCase().includes(term.toLowerCase()) &&
                (listing.year === year)
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
                    {searchResults.map((listing) => (
                        <List.Item key={listing.id}>
                            <b>{listing.zipcode}</b> - {listing.budget}
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
