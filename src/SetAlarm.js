import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import './css/main.css'

export default class SetAlarm extends React.Component{
	constructor(props){
		super(props);
	
		this.setAlarmObj = [];
		this.state = {'curHour':0,'curMin':0,'curSecond':0,'divRef':1};
	
		this.setAlarm = this.setAlarm.bind(this);
		this.removeAlarm = this.removeAlarm.bind(this);
		this.timeoutFunc = this.timeoutFunc.bind(this);
		this.dropDown = this.dropDown.bind(this);
	
		let alarmObj = localStorage.getItem('alarmObj')?JSON.parse(localStorage.getItem('alarmObj')):localStorage.setItem("alarmObj", '');
		if(alarmObj){
			this.setAlarmObj.push(...alarmObj);
		}
	}

	componentDidMount(){
		if(this.setAlarmObj.length){
			this.setAlarmObj.map((values,i)=>{
				let date = new Date(); 
				let timeout = new Date(date.getFullYear(),date.getMonth(),date.getDate(),values.Hours,values.Mins,0,0) - date;
				if(timeout > 0){
					setTimeout(()=>{this.timeoutFunc(values.id);},timeout);	
				}else{
					this.setAlarmObj[i].Message = 'Alarm is off. You can set this alarm tomorrow.';
				}
				
			});
		}
		
	}
	
	setAlarm(e){

		let date = new Date(); 
		let id = parseInt(e.target.name);
		let pluck = _.pluck(this.setAlarmObj,'id');
		var indexOf = _.indexOf(pluck,id);
		let timeout = new Date(date.getFullYear(),date.getMonth(),date.getDate(),this.refs[`setHours${id}`].value,this.refs[`setMins${id}`].value,0,0) - date;
		
		if(indexOf === -1){
			let alarmObj = {'date':date.getDate(),'Hours':this.refs[`setHours${id}`].value,'Mins':this.refs[`setMins${id}`].value,'id':id,'Message':'Alarm is On.','timeoutId':0};
			var indexOf = (this.setAlarmObj.push(alarmObj)-1);
			this.props.changeNumber(id);
		}else{
			let divId = this.setAlarmObj[(this.setAlarmObj.length-1)]['id'];
			this.setAlarmObj[indexOf]['Hours'] = this.refs[`setHours${id}`].value;
			this.setAlarmObj[indexOf]['Mins'] = this.refs[`setMins${id}`].value;
			this.props.changeNumber(divId);
		}
		if(timeout > 0)
		{
			let timeoutId = setTimeout(()=>{this.timeoutFunc(id);},timeout);
			this.setAlarmObj[indexOf].Message = 'Alarm is On.';
			this.setAlarmObj[indexOf].timeoutId = timeoutId
		}else{
			this.setAlarmObj[indexOf].Message = 'Alarm is off. You can set this alarm tomorrow.';
		}
		localStorage.setItem('alarmObj',JSON.stringify(this.setAlarmObj));
	}

	removeAlarm(e){
		let pluck = _.pluck(this.setAlarmObj,'id');
		let indexOf = _.indexOf(pluck,parseInt(e.target.id));
		clearTimeout(parseInt(this.setAlarmObj[indexOf].timeoutId));
		this.setAlarmObj.splice(indexOf,1);
		localStorage.setItem('alarmObj',JSON.stringify(this.setAlarmObj));
		this.forceUpdate();
	}


	timeoutFunc(id){
		let pluck = _.pluck(this.setAlarmObj,'id');
		let indexOf = _.indexOf(pluck,id);
		alert('My Wake UP Call.');
		this.setAlarmObj[indexOf].Message = 'Alarm is off. You can set this alarm tomorrow.';
		this.forceUpdate();
	}

	dropDown(end,selected){
		let dropDownOptions = [];
		for(let i=0;i<=end;i++){
			if(selected && selected==i){
				dropDownOptions.push(<option key={i} value={i} selected="selected">{i}</option>);	
			}else{
				dropDownOptions.push(<option key={i} value={i}>{i}</option>);
			}
			
		}
		return dropDownOptions;
	}

	
	render(){
		return  <div className="col-md-12">
				{this.setAlarmObj.length?this.setAlarmObj.map((values,i)=>{
					return <div className="form-group col-md-12" key={`${values.id*60}`} ref={`div_${values.id}`}>
						<div className="col-md-2"><select className="form-control selectpicker" ref={`setHours${parseInt(values.id)}`} >{this.dropDown(23,parseInt(values.Hours))}</select></div>
						<div className="col-md-2"><select className="form-control selectpicker" ref={`setMins${parseInt(values.id)}`} >{this.dropDown(59,parseInt(values.Mins))}</select></div>
						<div className="col-md-2"><input type="button" name={`${parseInt(values.id)}`} className="btn btn-primary alarmButton" defaultValue="Set" onClick={this.setAlarm}/></div>
						<div className="col-md-2"><input type="button" id={`${parseInt(values.id)}`} className="btn btn-primary alarmButton" defaultValue="Remove" onClick={this.removeAlarm}/></div>
						<div className="col-md-3"><label className={values.Message=='Alarm is On.'?"label-success labelSuccess":"label-warning labelWarning"}>{values.Message}</label></div>
						</div>
				}):''}
				{typeof this.props.divRef != 'undefined' && this.props.divRef ? <div className="form-group col-md-12" ref={`div_${this.props.divRef}`}>
						<div className="col-md-3"><select className="form-control selectpicker" ref={`setHours${this.props.divRef}`} >{this.dropDown(23,'')}</select></div>
						<div className="col-md-3"><select className="form-control selectpicker" ref={`setMins${this.props.divRef}`} >{this.dropDown(59,'')}</select></div>
						<div className="col-md-3"><input type="button" name={`${this.props.divRef}`} className="btn btn-primary alarmButton" defaultValue="Set" onClick={this.setAlarm}/></div>
				</div>:''}
			
		</div>	
	}
}

