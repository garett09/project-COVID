import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InfoBox({ title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/*title*/}
                <Typography classname="infoBox__title" color="textSecondary">
                    {title}</Typography>

                <h2 className="infoBox__cases">{cases}</h2>
                {/*cases*/}
                <Typography classname="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
                {/*total*/}
            </CardContent>
        </Card>
    )
}

export default InfoBox
