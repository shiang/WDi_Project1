export const styles = {
    //SpecialtyMenus, Specialties and Orders pages

list: {
    overflowY: 'auto', 
    overflowX: 'hidden',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: '75vh',
},
pageDiv: {
    // marginLeft: 70,
    // marginRight: 70,
    marginTop: 64
},
pageDivWithSideBar: {
    marginTop: 64,
    marginLeft: 266,
},
mainDiv: {
    backgroundColor: '#EEF3F8',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
menuButton: {
    margin: 12,
    float: 'right',
},
//SpecialtyMenu and SpecialtyItem pages
headerButton: {
  display: 'flex', 
  alignSelf: 'flex-start', 
  justifyContent: 'space-between', 
  flexWrap: 'wrap'
},
iconMenu: {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'flex-end',
  flexFlow: 'row wrap'
},
//Orders Component page
chip: {
    backgroundColor: '#3b5998',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 40
  },
  subOrders: {
    margin: 10
  },
  subOrderItem: {
    marginTop: 10,
  },
  newOrderBadge: {
    top: 12, 
    right: 25
  },
  orderLists: {
    backgroundColor: '#dfe3ee', 
    display: 'flex',
    justifyContent: 'flex-start',
    margin: 10
  },
  orderSubTotal: {
    display: 'flex', 
    justifyContent: 'flex-end', 
    marginBottom: 5
  },
  orderInfo: {
    display: 'flex', 
    flexFlow: ' row wrap',
    justifyContent: 'space-between',

  }

}
