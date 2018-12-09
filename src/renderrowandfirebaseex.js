
//   import { connect } from 'react-redux';
  
//   componentWillMount() {
//     this.props.employeesFetch();

//     this.createDataSource(this.props);
//     console.log('properrrr1', this.props)
//   }

//   // called when you are about to recieve a set of new props to rerender the component with
//   componentWillReceiveProps(nextProps){
//     // nextprops are the next set of props that this component will be rendered with
//     // this.props is still the old set of props

//     // good method for reacting to change in your props object

//     // console.log('properrrr2', this.props)
//     this.createDataSource(nextProps);
//   }

//   // creates the scrollable list
//   createDataSource({employees}) {
//     console.log('boyeeee', this.props.employees, employees)
//     const ds = new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2
//     });
//     // below function expects an array of objects
//     this.dataSource = ds.cloneWithRows(employees);
//   }

//   renderRow(employee) {
//       return <ListItem employee={employee} />
//   }

//   render(){
//     console.log('most recent props in employeelist ->', this.props)
//     return(
//       <ListView
//         enableEmptySections
//         dataSource={this.dataSource}
//         renderRow={this.renderRow}
//       />
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   // state.employees is a huge object with many key pairs
//   // for each key value pair, run the function
//   console.log('employeelist Shate, do they ever make it?', state)
//   const employees = _.map(state.employees, (val, uid) => {
//     // map returns them all into an array
//     // console.log('val, uid', val, uid)
//     return { ...val, uid}
//   } )

//   return { employees };
// }

// export default connect( mapStateToProps, { employeesFetch })(EmployeeList);
// // export default EmployeeList;

// export default connect(
//   state => ({
//     propsName: state.accums.memberdash.accumsheaderdataforexample,
//   }),
//   {
//     actions,
//     thunks
//   }
// )
