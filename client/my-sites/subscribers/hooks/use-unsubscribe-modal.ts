import { useEffect, useState } from 'react';
import { useSelector } from 'calypso/state';
import { getSelectedSiteSlug } from 'calypso/state/ui/selectors';
import { UnsubscribeActionType } from '../components/unsubscribe-modal';
import { getEarnPaymentsPageUrl } from '../helpers';
import { useSubscriberRemoveMutation } from '../mutations';
import { Subscriber } from '../types';

const useUnsubscribeModal = ( siteId: number | null, currentPage: number ) => {
	const [ currentSubscriber, setCurrentSubscriber ] = useState< Subscriber >();
	const selectedSiteSlug = useSelector( getSelectedSiteSlug );
	const { mutate } = useSubscriberRemoveMutation( siteId, currentPage );

	const onClickUnsubscribe = ( subscriber: Subscriber ) => {
		setCurrentSubscriber( subscriber );
	};

	const onCloseModal = ( action: UnsubscribeActionType, subscriber?: Subscriber ) => {
		if ( action === UnsubscribeActionType.Manage ) {
			window.open( getEarnPaymentsPageUrl( selectedSiteSlug ), '_blank' );
		} else if ( action === UnsubscribeActionType.Unsubscribe && subscriber ) {
			mutate( subscriber );
		}

		setCurrentSubscriber( undefined );
	};

	// Reset current subscriber on unmount
	useEffect( () => {
		return () => {
			setCurrentSubscriber( undefined );
		};
	}, [] );

	return {
		currentSubscriber,
		onClickUnsubscribe,
		onCloseModal,
	};
};

export default useUnsubscribeModal;