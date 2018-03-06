import React from 'react'
import {Link} from 'react-router-dom'
import SetAlarm from './SetAlarm.js'


export default class Home extends React.Component{
	constructor(props){
		super(props);
		
		this.setAlarmObj = [];
		let alarmObj = localStorage.getItem('alarmObj')?JSON.parse(localStorage.getItem('alarmObj')):localStorage.setItem("alarmObj", '');
		if(alarmObj){
			this.setAlarmObj.push(...alarmObj);
		}
		this.changeTime = this.changeTime.bind(this);
		this.state = {'alarmNumber':this.setAlarmObj.length?(parseInt(this.setAlarmObj[(this.setAlarmObj.length-1)]['id'])+1):1};
		this.changeNumber = this.changeNumber.bind(this);
	}

	componentDidMount(){
		this.changeTime();
	}

	changeNumber(e){
		this.setState({
			'alarmNumber':e+1
		});
	}
	changeTime(){
		let date = new Date();
		let curHour = date.getHours();
		let curMin = date.getMinutes();
		let curSecond = date.getSeconds();
		this.setState({
			'curHour':curHour,'curMin':curMin,'curSecond':curSecond
		});
		setTimeout(this.changeTime,1000);
	}


	render(){

		return  <div className="container">
    	<div className="row">
			<div className="col-md-10 col-md-offset-1">
				<div className="panel panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-md-12">
								Set Alarm for today({new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()})
							</div>
						</div>
					</div>
					<div className="panel-body" style={{marginBottom:"5%"}}>
						<div className="row">
							<div className="col-md-12 col-md-offset-1">
								<form id="login-form" action="#" method="post" role="form">
								<div className="col-md-12" style={{marginBottom:"10%"}}>
								<div className="col-md-3"><input type="text" className="form-control" value={this.state.curHour} readOnly="true"/></div>
								<div className="col-md-3"><input type="text" className="form-control" value={this.state.curMin} readOnly="true" /></div>
								<div className="col-md-3"><input type="text" className="form-control" value={this.state.curSecond}  readOnly="true"/></div>
								</div>
								<SetAlarm divRef={this.state.alarmNumber}  changeNumber={this.changeNumber}/>
								</form>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	}
}

