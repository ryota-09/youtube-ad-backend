import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from './db.service';
import { PrismaService } from '@/prisma.service';

describe('DbService', () => {
  let service: DbService;
  let prismaService: PrismaService;
  const timeout = 1000 * 40;
  const inputData = {
    id: 'dummy-videoId',
    snippet: {
      create: {
        channelId: 'dummy-channelId',
        title: 'dummy-title',
        description: 'dummy-description',
        thumbnail: 'https://example.com/dummy.png',
        channelTitle: 'dummy-channeil-title',
        tags: 'dummy-tag1,dummy-tag2,dummy-tag3',
        categoryId: 'dummy-category-id',
        liveBroadcastContent: 'dummy-content',
        publishedAt: '2021-12-03T13:00:12Z',
      },
    },
    statistics: {
      create: {
        viewCount: '1',
        likeCount: '2',
        favoriteCount: '3',
        commentCount: '4',
      },
    },
    status: {
      create: {
        uploadStatus: 'dummy-upload-status',
        privacyStatus: 'dummy-privacy-status',
        license: 'dummy-license',
        embeddable: false,
        publicStatsViewable: true,
        madeForKids: false,
      },
    },
    adsLandingPage: {
      create: {
        landingPageUrl: 'https://example.com/lp/dummy.html',
      },
    },
  };

  const deleteAllRelatedDataById = async (videoId) => {
    const prismaService = new PrismaService();
    const where = {
      videoId: videoId,
    };
    await prismaService.$transaction([
      prismaService.youTubeAdsLandingPage.deleteMany({ where }),
      prismaService.youTubeSnippet.deleteMany({ where }),
      prismaService.youTubeStatistics.deleteMany({ where }),
      prismaService.youTubeStatus.deleteMany({ where }),
      prismaService.youTube.deleteMany({
        where: {
          id: videoId,
        },
      }),
    ]);
    await prismaService.$disconnect();
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService, PrismaService],
    }).compile();

    service = module.get<DbService>(DbService);
    prismaService = module.get<PrismaService>(PrismaService);

    await deleteAllRelatedDataById(inputData.id);
  });

  afterAll(async () => {
    await deleteAllRelatedDataById(inputData.id);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create and Find data', () => {
    it(
      '[Create]DBの動作確認用に作ったテスト（確認が済んだら "xit" でテストが実行されないようにする）',
      async () => {
        const resultOfCreate = await service.createAllRelatedData(inputData);

        console.log({ resultOfCreate });
      },
      timeout,
    );

    it(
      '[Find]DBの動作確認用に作ったテスト（確認が済んだら "xit" でテストが実行されないようにする）',
      async () => {
        const resultOfFindone = await service.findOne(inputData.id);

        console.log({ resultOfFindone });
      },
      timeout,
    );
  });
});
