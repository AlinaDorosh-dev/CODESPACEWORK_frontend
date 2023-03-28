import style from './badge.module.css';

function Badge({ type, text }) {
	return (
		<>
			{type === 'primary' && (
				<span className={`${style['badge']} ${style['badge-primary']}`}>
					{text}
				</span>
			)}
			{type === 'secondary' && (
				<span className={`${style['badge']} ${style['badge-secondary']}`}>
					{text}
				</span>
			)}
			{type === 'success' && (
				<span className={`${style['badge']} ${style['badge-success']}`}>
					{text}
				</span>
			)}
			{type === 'danger' && (
				<span className={`${style['badge']} ${style['badge-danger']}`}>
					{text}
				</span>
			)}
			{type === 'warning' && (
				<span className={`${style['badge']} ${style['badge-warning']}`}>
					{text}
				</span>
			)}
			{type === 'info' && (
				<span className={`${style['badge']} ${style['badge-info']}`}>
					{text}
				</span>
			)}
			{type === 'light' && (
				<span className={`${style['badge']} ${style['badge-light']}`}>
					{text}
				</span>
			)}
			{type === 'dark' && (
				<span className={`${style['badge']} ${style['badge-dark']}`}>
					{text}
				</span>
			)}
			{type === 'code' && (
				<span className={`${style['badge']} ${style['badge-code']}`}>
					{text}
				</span>
			)}
		</>
	);
}

export default Badge;
