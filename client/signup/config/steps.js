/**
 * External dependencies
 */

import { current as currentPage } from 'page';

/**
 * Internal dependencies
 */
import {
	addEmailToCart,
	addPlanToCart,
	createAccount,
	createSite,
	createWpForTeamsSite,
	createSiteOrDomain,
	createSiteWithCart,
	setThemeOnSite,
	addDomainToCart,
	launchSiteApi,
	isPlanFulfilled,
	isDomainFulfilled,
	isSiteTypeFulfilled,
	isSiteTopicFulfilled,
	maybeRemoveStepForUserlessCheckout,
} from 'calypso/lib/signup/step-actions';
import { generateSteps } from './steps-pure';

export default generateSteps( {
	addPlanToCart,
	createAccount,
	createSite,
	createWpForTeamsSite,
	createSiteOrDomain,
	createSiteWithCart,
	currentPage,
	setThemeOnSite,
	addDomainToCart,
	addEmailToCart,
	launchSiteApi,
	isPlanFulfilled,
	isDomainFulfilled,
	isSiteTypeFulfilled,
	isSiteTopicFulfilled,
	maybeRemoveStepForUserlessCheckout,
} );

export function isDomainStepSkippable( flowName ) {
	return flowName === 'test-fse';
}
