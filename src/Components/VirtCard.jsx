import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

const VirtCard = ({card, editCard}) => (
  <Card onTouchTap={() => editCard(card)} >
    <CardHeader
      title={card.name}
      subtitle={'apiType: ' + card.apiType}
    >
      <Badge
        badgeContent={
          <IconButton 
            tooltip={card.running ? 'Deployed' : 'Not Deployed'}
            iconStyle={{width: 48, height: 48, color: card.running ? 'green' : 'red', float: 'right'}}
            style={{float: 'right'}}
          >

            <Power />
          </IconButton>}
      />
    </CardHeader>
    <CardText expandable={false}>
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>virtualization id:</TableRowColumn>
            <TableRowColumn>{card.virtualizationID}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>port:</TableRowColumn>
            <TableRowColumn>{card.port}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>protocol:</TableRowColumn>
            <TableRowColumn>{card.protocol}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>API type:</TableRowColumn>
            <TableRowColumn>{card.apiType}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </CardText>
  </Card>
);

export default VirtCard;
