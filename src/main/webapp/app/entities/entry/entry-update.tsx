import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBlog } from 'app/shared/model/blog.model';
import { getEntities as getBlogs } from 'app/entities/blog/blog.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './entry.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntryUpdate = (props: IEntryUpdateProps) => {
  const [idstag, setIdstag] = useState([]);
  const [blogId, setBlogId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { entryEntity, blogs, tags, loading, updating } = props;

  const { content } = entryEntity;

  const handleClose = () => {
    props.history.push('/entry');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getBlogs();
    props.getTags();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const entity = {
        ...entryEntity,
        ...values,
        tags: mapIdList(values.tags),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="positionApp.entry.home.createOrEditLabel">
            <Translate contentKey="positionApp.entry.home.createOrEditLabel">Create or edit a Entry</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entry-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="entry-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="entry-title">
                  <Translate contentKey="positionApp.entry.title">Title</Translate>
                </Label>
                <AvField
                  id="entry-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="entry-content">
                  <Translate contentKey="positionApp.entry.content">Content</Translate>
                </Label>
                <AvInput
                  id="entry-content"
                  type="textarea"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="entry-date">
                  <Translate contentKey="positionApp.entry.date">Date</Translate>
                </Label>
                <AvInput
                  id="entry-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.entryEntity.date)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="entry-blog">
                  <Translate contentKey="positionApp.entry.blog">Blog</Translate>
                </Label>
                <AvInput id="entry-blog" type="select" className="form-control" name="blog.id">
                  <option value="" key="0" />
                  {blogs
                    ? blogs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="entry-tag">
                  <Translate contentKey="positionApp.entry.tag">Tag</Translate>
                </Label>
                <AvInput
                  id="entry-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={entryEntity.tags && entryEntity.tags.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tags
                    ? tags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/entry" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  blogs: storeState.blog.entities,
  tags: storeState.tag.entities,
  entryEntity: storeState.entry.entity,
  loading: storeState.entry.loading,
  updating: storeState.entry.updating,
  updateSuccess: storeState.entry.updateSuccess,
});

const mapDispatchToProps = {
  getBlogs,
  getTags,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryUpdate);
