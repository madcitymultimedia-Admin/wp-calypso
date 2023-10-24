import { Button } from '@wordpress/components';
import { useTranslate } from 'i18n-calypso';
import DateInput from './stats-date-control-date-input';
import { DateControlPickerDateProps } from './types';

const getLocaleDateFormat = () => {
	const date = new Date( 2001, 11, 25 ).toLocaleDateString().substring( 0, 10 );
	return date.replace( '2001', 'yyyy' ).replace( '12', 'mm' ).replace( '25', 'dd' );
};

const DateControlPickerDate = ( {
	startDate = '',
	endDate = '',
	onStartChange,
	onEndChange,
	onApply,
	onCancel,
}: DateControlPickerDateProps ) => {
	const translate = useTranslate();

	return (
		<div className="date-control-picker-date">
			<h2 className="date-control-picker-date__heading">
				{ translate( 'Date Range' ) }
				<span> ({ getLocaleDateFormat() }) </span>
			</h2>
			<div className="stats-date-control-picker-dates__inputs">
				<div className="stats-date-control-picker-dates__inputs-input-group">
					<label htmlFor="startDate">From</label>
					<DateInput id="startDate" value={ startDate } onChange={ onStartChange } />
				</div>
				<div className="stats-date-control-picker-dates__inputs-input-group">
					<label htmlFor="endDate">To</label>
					<DateInput id="endDate" value={ endDate } onChange={ onEndChange } />
				</div>
			</div>
			<div className="stats-date-control-picker-dates__buttons">
				<Button onClick={ onCancel }>{ translate( 'Cancel' ) }</Button>
				<Button variant="primary" onClick={ onApply }>
					{ translate( 'Apply' ) }
				</Button>
			</div>
		</div>
	);
};

export default DateControlPickerDate;