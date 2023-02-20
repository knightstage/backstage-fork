/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  Progress,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { useAsync } from 'react-use';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';
import { Alert } from '@material-ui/lab';
import { DenseTable } from '../ExampleFetchComponent/ExampleFetchComponent';

const GitHubProxyComponent = () => {
  const discoveryApi = useApi(discoveryApiRef);
  const baseUrl = discoveryApi.getBaseUrl('proxy');

  const { value, loading, error } = useAsync(async () => {
    const response = await fetch(await baseUrl);
    const data = await response.json();
    return data.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable users={value || []} />;
};

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header
      title="Welcome to the FrontSide plugin!"
      subtitle="Enjoy your stay!"
    >
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              All content should be wrapped in a card like this.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <GitHubProxyComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
