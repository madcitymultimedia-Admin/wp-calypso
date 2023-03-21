import { isEnabled } from '@automattic/calypso-config';
import { Button } from '@automattic/components';
import {
	__experimentalNavigatorBackButton as NavigatorBackButton,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';
import { usePrevious } from '@wordpress/compose';
import { useTranslate } from 'i18n-calypso';
import { useEffect } from 'react';
import NavigatorHeader from './navigator-header';
import PatternSelector from './pattern-selector';
import { useSectionPatterns } from './patterns-data';
import type { Pattern } from './types';

interface Props {
	selectedPattern: Pattern | null;
	onSelect: ( selectedPattern: Pattern | null ) => void;
	onBack: () => void;
	onDoneClick: () => void;
}

const ScreenPatternList = ( { selectedPattern, onSelect, onBack, onDoneClick }: Props ) => {
	const translate = useTranslate();
	const patterns = useSectionPatterns();
	const navigator = useNavigator();
	const prevSelectedPattern = usePrevious( selectedPattern );
	const isSidebarRevampEnabled = isEnabled( 'pattern-assembler/sidebar-revamp' );

	useEffect( () => {
		if ( prevSelectedPattern && ! selectedPattern ) {
			navigator.goBack();
		}
	}, [ prevSelectedPattern, selectedPattern ] );

	return (
		<>
			{ isSidebarRevampEnabled && (
				<NavigatorHeader
					title={ selectedPattern ? translate( 'Replace a pattern' ) : translate( 'Add patterns' ) }
				/>
			) }
			<div className="screen-container__body">
				<PatternSelector
					title={ ! isSidebarRevampEnabled ? translate( 'Add sections' ) : undefined }
					patterns={ patterns }
					onSelect={ onSelect }
					onBack={ onBack }
					selectedPattern={ selectedPattern }
				/>
			</div>
			<div className="screen-container__footer">
				<NavigatorBackButton
					as={ Button }
					className="pattern-assembler__button"
					primary
					onClick={ onDoneClick }
				>
					{ translate( 'Save' ) }
				</NavigatorBackButton>
			</div>
		</>
	);
};

export default ScreenPatternList;
