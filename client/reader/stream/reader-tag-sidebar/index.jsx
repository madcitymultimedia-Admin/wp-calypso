import { useTranslate } from 'i18n-calypso';
import TagLink from 'calypso/blocks/reader-post-card/tag-link';
import { useRelatedMetaByTag } from 'calypso/data/reader/use-related-meta-by-tag';
import { useTagStats } from 'calypso/data/reader/use-tag-stats';
import formatNumberCompact from 'calypso/lib/format-number-compact';
import ReaderListFollowingItem from 'calypso/reader/stream/reader-list-followed-sites/item';
import '../style.scss';

const ReaderTagSidebar = ( { tag } ) => {
	const translate = useTranslate();
	const relatedMetaByTag = useRelatedMetaByTag( tag );
	const tagStats = useTagStats( tag );
	if ( relatedMetaByTag === undefined ) {
		return null;
	}

	const tagLinks = relatedMetaByTag.data?.related_tags?.map( ( relatedTag ) => (
		<TagLink tag={ relatedTag } key={ relatedTag.slug } />
	) );
	const relatedSitesLinks = relatedMetaByTag.data?.related_sites?.map( ( relatedSite ) => (
		<ReaderListFollowingItem key={ relatedSite.feed_ID } site={ relatedSite } path="/" />
	) );

	return (
		<>
			{ tagStats && (
				<div className="reader-tag-sidebar-stats">
					<div className="reader-tag-sidebar-stats__item">
						<span className="reader-tag-sidebar-stats__count">
							{ formatNumberCompact( tagStats?.data?.total_posts ) }
						</span>
						<span className="reader-tag-sidebar-stats__title">{ translate( 'Posts' ) }</span>
					</div>
					<div className="reader-tag-sidebar-stats__item">
						<span className="reader-tag-sidebar-stats__count">
							{ formatNumberCompact( tagStats?.data?.total_sites ) }
						</span>
						<span className="reader-tag-sidebar-stats__title">{ translate( 'Sites' ) }</span>
					</div>
				</div>
			) }
			{ tagLinks && (
				<div className="reader-tag-sidebar-related-tags">
					<h2>{ translate( 'Related Tags' ) }</h2>
					<div className="reader-post-card__tags">{ tagLinks }</div>
				</div>
			) }
			{ relatedSitesLinks && (
				<div className="reader-tag-sidebar-related-sites">
					<h2>{ translate( 'Related Sites' ) }</h2>
					{ relatedSitesLinks }
				</div>
			) }
		</>
	);
};

export default ReaderTagSidebar;