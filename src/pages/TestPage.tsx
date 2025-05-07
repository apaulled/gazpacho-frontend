import React, {useEffect} from 'react';
import * as testApi from "../backend/testApi";

const TestPage: React.FC = () => {
    useEffect(() => {
        testApi.runTests();
    }, []);

    return (
        <>
            <h1>Test Page</h1>
            <p>If there is no popup on your screen then the tests passed.</p>
        </>
    );
}

export default TestPage;