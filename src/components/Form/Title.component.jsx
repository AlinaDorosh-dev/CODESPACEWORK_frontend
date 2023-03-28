/**
 * @author VeroniKa Sanchez
 * @author iRaphiki <imraphiki@gmail.com>
 */
/**
 * Title Component:
 * Create diferent title { xl => h2 } { l => h3 } { s => h4 },
 * with alternative text into a paragraph { p }.
 */
export const Title = ({ title, altText, size }) => {
	return (
		<>
			{size === 'xl' && <h2>{title}</h2>}
			{size === 'l' && <h3>{title}</h3>}
			{size === 's' && <h4>{title}</h4>}
			{altText && <p>{altText}</p>}
		</>
	);
};
