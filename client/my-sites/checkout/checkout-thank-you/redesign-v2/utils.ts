import { isWpComPlan } from '@automattic/calypso-products';
import { CheckoutThankYouCombinedProps, getFailedPurchases, getPurchases } from '..';
import { isBulkDomainTransfer, isDomainOnly } from '../utils';

/**
 * Determines whether the current checkout flow is for a redesign V2 purchase.
 * Used for gradually rolling out the redesign.
 * @returns {boolean} True if the checkout flow is for a redesign V2 purchase, false otherwise.
 */
export const isRedesignV2 = ( props: CheckoutThankYouCombinedProps ) => {
	// Fallback to old design when there is a failed purchase.
	const failedPurchases = getFailedPurchases( props );
	if ( failedPurchases.length > 0 ) {
		return false;
	}

	const purchases = getPurchases( props );

	// ThankYou page for only purchasing a plan.
	if ( purchases.length === 1 ) {
		return isWpComPlan( purchases[ 0 ].productSlug );
	}
	return false;
};

/**
 * Determines whether the current checkout flow renders a redesigned congrats page
 * using the new component `<ThankYouV2>` instead of `<ThankYouLayout>`. The ultimate
 * goal is to refactor and migrate all thank you pages to use `<ThankYouV2>`, so that
 * consistent structure and styling are applied.
 *
 * @returns {boolean}
 */
export const isRefactoredForThankYouV2 = ( props: CheckoutThankYouCombinedProps ) => {
	// Fallback to old design when there is a failed purchase.
	const failedPurchases = getFailedPurchases( props );
	if ( failedPurchases.length > 0 ) {
		return false;
	}

	const purchases = getPurchases( props );

	if ( isBulkDomainTransfer( purchases ) ) {
		return true;
	}

	if ( isDomainOnly( purchases ) ) {
		return true;
	}

	return false;
};
