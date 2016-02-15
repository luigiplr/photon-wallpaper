import alt from '../alt';



export default alt.generateActions(
	/* Core actions */

	'providerChange',
	'autoSyncChange',
	'syncTimeoutChange',
	'resolutionChange',
	'monitorChange',
	'backupSet',
	'filterChange',
	'info',
	'syncing',
	'synced',


	/* Reddit Actions */

	'fromChange',
	'sortChange',
	'scoreChange',
	'subredditChange',


	/* Bing Actions */

	'regionChange'
);