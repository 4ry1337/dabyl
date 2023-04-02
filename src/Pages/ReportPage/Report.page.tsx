import React from 'react';
import {Navigate, useParams} from "react-router";
import {Report} from "Features";


export const ReportPage = () => {
    let { reportID } = useParams();

    if (!reportID) {
        return <Navigate to={'/history'} replace={true} />
    }

    return (
        <Report id={reportID}/>
    );
};
