export default function PlanForBegginersMan() {
  return (
    <div className="mt-5 card-body shadow">
      <h2 className="text-center">Mężczyźni</h2>
      <table className="table text-center">
        <caption className="text-center">
          Plan wykonujemy w następujący sposób:
          <ul className="list-unstyled">
            <li>
              <a>Poniedziałek A</a>
            </li>
            <li>
              <a>Środa B</a>
            </li>
            <li>
              <a>Piątek A</a>
            </li>
            <li>
              <a>Poniedziałek B</a>
            </li>
            <li>
              <a>Środa A </a>
            </li>
            <li>
              <a>Piątek B</a>
            </li>
          </ul>
        </caption>

        <thead>
          <tr>
            <th scope="col">Trening A</th>
            <th scope="col">Trening B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Przysiady 5x5</td>
            <td>Martwy ciąg klasyczny 5x5</td>
          </tr>
          <tr>
            <td>Wyciskanie leżąc 5x5</td>
            <td>Wyciskanie Żołnierskie 5x5</td>
          </tr>
          <tr>
            <td>Wiosłowanie 5x5</td>
            <td>Podciąganie wąsko 5x5</td>
          </tr>
          <tr>
            <td>Wznosy bokiem 3x8</td>
            <td>Wyciskanie wąsko 3x8</td>
          </tr>
          <tr>
            <td>Biceps + Triceps</td>
            <td>Biceps 3x8</td>
          </tr>
          <tr>
            <td>Allahy 3x8</td>
            <td>Deska x3</td>
          </tr>
          <tr>
            <td>Łydki 3x8</td>
            <td>Łydki 3x8</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
