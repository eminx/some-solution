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
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Actions"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={'#aaa'} />
  </IconButton>
);

const VirtCard = ({card, editCard, toggleDeploy}) => (
  <Card >
    <CardHeader
      style={{backgroundColor: '#eee', paddingLeft: '1em'}}
      title={
        <div onTouchTap={() => editCard(card)} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
          <Badge
            badgeContent={
              <IconButton 
                tooltip={card.running ? 'Deployed' : 'Not Deployed'}
                style={{width: 72, height: 72}}
                iconStyle={{width: 48, height: 48, color: card.running ? 'green' : 'red'}}
              >
                <Power />
              </IconButton>}
          />
          <h3 style={{marginLeft: '2em'}}>{card.name}</h3>
        </div>
      }
    >
      <div style={{float: 'right'}}>
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onTouchTap={() => editCard(card)} >Edit</MenuItem>
          <MenuItem >
            <Toggle
              label={card.running ? 'Undeploy' : 'Deploy'}
              toggled={card.running}
              onToggle={() => toggleDeploy(card)}
            />
          </MenuItem>
        </IconMenu>
      </div>

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
