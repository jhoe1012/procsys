
import React, { useState } from 'react';
import { DataSheetGrid, textColumn, keyColumn } from  'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css'; 

const Create = () => {
    // Initial data for the grid
    const [data, setData] = useState([
        { item: 'Item 1', selection: [{item: 1} ] },
        { item: 'Item 2', selection: [{item: 2} ] },
        { item: 'Item 3', selection: [{item: 3},{item: 5},{item: 4} ]},
    ]);

    // Dynamic options based on the row's data
    const getOptions = (rowData) => {
        switch (rowData.item) {
            case 'Item 1':
                return ['Option 1', 'Option 2'];
            case 'Item 2':
                return ['Option 3', 'Option 4'];
            case 'Item 3':
                return ['Option 5', 'Option 6'];
            default:
                return [];
        }
    };

    // Define the columns for the grid
    const columns = [
        {
            ...keyColumn('item', textColumn),
            title: 'Item',
        },
        {
            ...keyColumn('selection', {
                component: ({ rowData, setValue }) => (
                    
                     rowData && 
                     <select
                     value={rowData.selection}
                     onChange={(e) => setValue(e.target.value)}
                     >
                        {console.log('rowData', rowData)}
                        <option value="" disabled>Select an option</option>
                        {rowData.map(({item}) => (
                            
                            <option key={item} value={item}>
                                 {console.log('item', item)}
                                {item}
                            </option>
                        ))}
                    </select> 
            
                ),
            }),
            title: 'Selection',
        },
    ];

    return (
        <div>
            <h2>React Datasheet Grid with Dynamic Dropdowns</h2>
            <DataSheetGrid
                value={data}
                onChange={setData}
                columns={columns}
            />
        </div>
    );
};

export default Create;