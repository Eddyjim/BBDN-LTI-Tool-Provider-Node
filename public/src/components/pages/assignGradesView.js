import React from "react";
import JSONTree from "react-json-tree";
import Typography from "@material-ui/core/Typography";
import {styles} from "../../common/styles/custom.js";

class AssignGradesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("agPayloadData")
      .then(result => result.json())
      .then(agPayload => {
        this.setState({
          origBody: agPayload.orig_body,
          claim: agPayload.claim,
          lineItems: agPayload.lineItems,
          lineItem: agPayload.lineItem,
          body: agPayload.body
        });
      });
  }

  render() {
    const body = JSON.stringify(this.state.origBody);
    const readcol =
      this.state.lineItem !== "" && this.state.lineItem !== undefined ? (
        <form action="/agsReadCols" method="post">
          <input type="submit" value="Read Column" />
          <input type="hidden" name="body" defaultValue={body} />
          <input type="hidden" name="url" defaultValue={this.state.lineItem} />
        </form>
      ) : (
        <Typography variant="body1" style={styles.notAvailable}>
          <b>Read Column not available</b>
        </Typography>
      );
    const delcol =
      this.state.lineItem !== "" && this.state.lineItem !== undefined ? (
        <form action="/agsDeleteCol" method="post">
          <table>
            <tbody>
            <tr>
              <td>
                <input type="submit" value="Delete Column"/>
                <input type="hidden" name="body" defaultValue={body}/>
                <input type="hidden" name="url" defaultValue={this.state.lineItem}/>
                <input type="hidden" name="itemsUrl" defaultValue={this.state.lineItems}/>
              </td>
              <td>
                <input
                  type="text"
                  name="columnId"
                  size="10"
                  placeholder="Column ID"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <Typography variant="body1" style={styles.notAvailable}>
          <b>Delete Column not available</b>
        </Typography>
      );
    const results =
      this.state.lineItem !== "" && this.state.lineItem !== undefined ? (
        <form action="/agsResults" method="post">
          <input type="submit" value="Read Results" />
          <input type="hidden" name="body" defaultValue={body} />
          <input type="hidden" name="url" defaultValue={this.state.lineItem} />
        </form>
      ) : (
        <Typography variant="body1" style={styles.notAvailable}>
          <b>Results not available</b>
        </Typography>
      );
    const scores =
      this.state.lineItem !== "" && this.state.lineItem !== undefined ? (
        <form action="/agsScores" method="post">
          <table>
            <tbody>
            <tr>
              <td>
                <input type="submit" value="Send Scores"/>
                <input type="hidden" name="body" defaultValue={body}/>
                <input type="hidden" name="url" defaultValue={this.state.lineItem}/>
                <input type="hidden" name="itemsUrl" defaultValue={this.state.lineItems}/>
              </td>
              <td>
                <input
                  type="text"
                  name="userid"
                  size="10"
                  placeholder="User UUID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="score"
                  size="10"
                  placeholder="score"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="column"
                  size="10"
                  placeholder="Column ID"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <Typography variant="body1" style={styles.notAvailable}>
          <b>Scores not available</b>
        </Typography>
      );
    const submitAttempt =
      this.state.lineItem !== "" && this.state.lineItem !== undefined ? (
        <form action="/agsSubmitAttempt" method="post">
          <table>
            <tbody>
            <tr>
              <td>
                <input type="submit" value="Submit Attempt"/>
                <input type="hidden" name="body" defaultValue={body}/>
                <input type="hidden" name="url" defaultValue={this.state.lineItem}/>
              </td>
              <td>
                <input
                  type="text"
                  name="userid"
                  size="10"
                  placeholder="User UUID"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <Typography variant="body1" style={styles.notAvailable}>
          <b>Scores not available</b>
        </Typography>
      );

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Assignment and Grade Service
        </Typography>

        <div>
          <Typography variant="body1">
            What would you like to do?
          </Typography>
          <ul style={styles.ulNoDecoration}>
            <li>
              <form action="/agsReadCols" method="post">
                <input type="submit" value="Read Columns"/>
                <input type="hidden" name="body" defaultValue={body}/>
                <input type="hidden" name="url" defaultValue={this.state.lineItems}/>
              </form>
            </li>
            <li>
              <form action="/agsAddCol" method="post">
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <input type="submit" value="Add/Update Column"/>
                      <input type="hidden" name="body" defaultValue={body}/>
                      <input
                        type="hidden"
                        name="url"
                        defaultValue={this.state.lineItems}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="score"
                        size="10"
                        placeholder="score"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="label"
                        size="10"
                        placeholder="column name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="columnId"
                        size="10"
                        placeholder="Column ID"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="dueDate"
                        size="20"
                        placeholder="Due Date"
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </form>
            </li>
            <li>
              {readcol}
            </li>
            <li>
              {delcol}
            </li>
            <li>
              {results}
            </li>
            <li>
              {scores}
            </li>
            <li>
              {submitAttempt}
            </li>
          </ul>

          <br />
          <Typography variant="h5">
            Assignment and Grades Response
          </Typography>

          <Typography variant="body1">
            <b>Claims</b>
          </Typography>
          <JSONTree data={this.state.claim} hideRoot={true} theme={styles.monokai} invertTheme={true} />

          <Typography variant="body1">
            <b>Response</b>
          </Typography>
          <JSONTree data={this.state.body} hideRoot={true} theme={styles.monokai} invertTheme={true} />
        </div>
      </div>
    );
  }
}

export default AssignGradesView;
